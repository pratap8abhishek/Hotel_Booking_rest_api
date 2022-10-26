const { isObjectIdOrHexString } = require("mongoose");
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

const createHotel = async(req,res,next)=>{
    const newHotel = new Hotel(req.body);
    try {
      const saveHotel = await newHotel.save();
      res.status(200).json(saveHotel);  
    } catch (error) {
        next(error);
    }
};

const updateHotel = async(req,res,next)=>{
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true});
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

const deleteHotel = async(req,res,next)=>{
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleated");
  } catch (error) {
    next(error);
  }
};

const getHotel = async(req,res,next)=>{
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel); 
  } catch (error) {
    next(error);
  }
};

const getHotels = async(req,res,next)=>{
    const {min,max,...other} = req.query;
    try {
      const hotels = await Hotel.find({
        ...Others,
        chepeastPrice:{$get: min | 1, $lt: max || 999},
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (error) {
      next(error);
    }
};

const countByCity = async(req,res,next)=>{
  const cities = req.query.cities.split(",");
  try {
     const list = await Promise.all(
      cities.map((city)=>{
        return Hotel.countDocuments({city: city})
      })
     );
     res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

const countByType = async(req,res,next)=>{
  try {
    const hotelCount = await Hotel.countDocuments({type: "hotel"});
    const apartmentCount = await Hotel.countDocuments({type: "apartment"});
    const resortCount = await  Hotel.countDocuments({type: "resort"});
    const villaCount = await Hotel.countDocuments({type: villa});
    const cabinCount = await Hotel.countDocuments({type: cabin});

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      {type: "cabins", count: cabinCount }, 
    ]);
  } catch (error) {
    next(error);
  }
};

const getHotelRooms = async(req,res)=>{
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.room.map((room)=>{
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

module.exports = {createHotel,updateHotel,deleteHotel,getHotel,getHotels,countByCity,countByType,getHotelRooms};























