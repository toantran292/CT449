const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  if(!req.body?.name){
    return next(new ApiError(400, "Name cannot be empty!"))
  }

  try{
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.create(req.body);
    // console.log(document)
    return res.send(document)
  } catch (error) {
    console.log(error)
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    )
  }
};
exports.findAll = async (req, res, next) => {
  // res.send({ message: "findAll handler" });
  let documents = [];

  try{
    const contactService = new ContactService(MongoDB.client);
    const {name} = req.query;
    if(name){
      documents = await contactService.findByName(name); 
    } else {
      documents = await contactService.find({})
    }
    return res.send(documents)
  } catch (err){
    new ApiError(500, "An error occurred while retrieving contacts")
  }


};
exports.findOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);
    if(!document){
      return next(new ApiError(400, "Contact not found"));
    }
    return res.send(document)
  } catch (error) {
    return next(new ApiError(500, `Error retrieving contact with id = ${req.params.id}`))
  }
};
exports.update = async (req, res, next)  => {
  // res.send({ message: "update handler" });
  if(Object.keys(req.body).length === 0){
    return next(new ApiError(400, "Data to update cannot be empty"))
  }
  
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body);
    if(!document){
      return next(new ApiError(400, "Contact not found"));
    }
    return res.send({message: "Contact was updated successfully"})
  } catch (error) { 
    return next(new ApiError(500, `Error updating contact with id = ${req.params.id}`))
    
  }
};
exports.delete = async (req, res, next)  => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.delete(req.params.id, req.body);
    if(!document){
      return next(new ApiError(400, "Contact not found"));
    }
    return res.send({message: "Contact was deleted successfully"})
  } catch (error) { 
    return next(new ApiError(500, `Error delete contact with id = ${req.params.id}`))
    
  }
};
exports.deleteAll = async (req, res, next)  => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const deleteCount = await contactService.deleteAll();
    return res.send({message: `${deleteCount} contacts were deleted successfully`})
  } catch (error) { 
    return next(new ApiError(500, `An error occurred while removing all contacts`))
    
  }
};
exports.findAllFavorite = async (req, res, next)  => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const documents = await contactService.findFavorite();
    return res.send(documents)
  } catch (error) { 
    return next(new ApiError(500, `An error occurred while retrieving favorite contacts`))
    
  }
};
