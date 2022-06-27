const multer = require('multer');
const multerConfig = require('../utils/multerConfig.utils');
const anunciosModel = require('../models/anuncios.models');

const uploads = multer(multerConfig).array('imagen', 6);

exports.fileUpload = (req, res, next) => {
    uploads(req, res, function(error){
        if(error){
            res.json({message: error});
        }
        return next();
    });
};

exports.crearAnuncio = async (req, res) => {
    try {
        //crear un objeto DTO que contenga todo el body
        var anuncioDTO = req.body;

        //crear el array amenidades a guardar
        var amenidades = [{
            cantidad_baños: anuncioDTO.cantidad_banios,
            cantidad_habitaciones: anuncioDTO.cantidad_habitaciones,
            cantidad_estacionamientos: anuncioDTO.cantidad_estacionamientos,
            piscina: anuncioDTO.piscina,
            aire_acondicionado: anuncioDTO.aire_acondicionado,
            seguridad_privada: anuncioDTO.seguridad_privada,
            jardin: anuncioDTO.jardin
        }];    

        //creare el anuncio a guardar
        var anuncio = new anunciosModel(
            {
                nombre: anuncioDTO.nombre,
                moneda: anuncioDTO.moneda,
                precio: anuncioDTO.precio,
                descripcion: anuncioDTO.descripcion,
                amenidades: amenidades,
                usuarios: req.user.cusu._id
            }
        );

        //asignar el nombre de los archivos cargados al campo imagen del anuncio
        anuncio.imagen = req.files[0].filename;
        
        var imagenes = [];
        req.files.forEach(item => {
            if(item.filename != anuncio.imagen){
                imagenes.push(item.filename);
            }
        });

        anuncio.imagenes = imagenes;

        //guardar anuncio
        await anuncio.save();
        res.status(200).send(anuncio);

    } catch (error) {
        console.error(error);
        res.status(500).send('ocurrio un error en el servidor');
    }
}

exports.obtenerAnuncios = async (req, res) => {
    try {
        var anuncios;
        anuncios = await anunciosModel.find()
                    .populate({path: "moneda"})
                    .populate({path: "amenidades"});

        res.status(200).json(anuncios);
    } catch (error) {
        console.error(error);
        res.status(500).send('ocurrio un error en el servidor');
    }
}

exports.actualizarAnuncios = async (req, res) => {
    try {
        let newAnuncio = req.body;

        var amenidades =[{
            cantidad_baños: newAnuncio.cantidad_banios,
            cantidad_habitaciones: newAnuncio.cantidad_habitaciones,
            cantidad_estacionamientos: newAnuncio.cantidad_estacionamientos,
            piscina: newAnuncio.piscina,
            aire_acondicionado: newAnuncio.aire_acondicionado,
            seguridad_privada: newAnuncio.seguridad_privada,
            jardin: newAnuncio.jardin
        }];

        var anuncio = new anunciosModel(
        {
            _id: req.params.id,
            nombre: newAnuncio.nombre,
            moneda: newAnuncio.moneda,
            precio: newAnuncio.precio,
            descripcion: newAnuncio.descripcion,
            amenidades: amenidades,
            usuarios: req.user.cusu._id
        });

        var imagenes = [];
        
        if(req.files){
            anuncio.imagen = req.files[0].filename;
            req.files.forEach(item => {
                if(item.filename != anuncio.imagen);{
                    imagenes.push(item.filename);
                }
            });
            anuncio.imagenes = imagenes;
        } else {
            var imagenesLast = await anunciosModel.findById(rq.params.id);
            anuncio.imagen = imagenesLast.imagen;
            anuncio.imagenes = imagenesLast.imagenes;
        }

        const anuncioUpdate = await anunciosModel.findOneAndUpdate(
            { _id: req.params.id },
            anuncio,
            { new: true }
        )

        res.status(200).send(anuncioUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).send('ocurrio un error en el servidor');
    }
}

exports.eliminarAnuncios = async (req, res) => {
    try {
        let anuncio = await anunciosModel.findById(req.params.id);

        if(!anuncio){
            res.status(404).json({message: 'No se encontro el anuncio'});
        }        
        await anunciosModel.findOneAndRemove({_id: req.params.id});
        res.status(200).json({message: 'Anuncio Eliminado Correctamente'});
    } catch (error) {
        console.error(error);
        res.status(500).send('ocurrio un error en el servidor');
    }
}