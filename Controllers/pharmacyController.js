import Pharmacy from '../Models/pharmacyModel.js';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const createPharmacy = async (req, res) => {
    const { name, location, coordinates } = req.body;

    try {
        // Validate location using Google Maps API
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[1]},${coordinates[0]}&key=${GOOGLE_MAPS_API_KEY}`);
        const formattedAddress = response.data.results[0].formatted_address;

        const newPharmacy = new Pharmacy({ name, location, coordinates, formattedAddress });
        await newPharmacy.save();
        res.status(201).json({ message: 'Pharmacy added', pharmacy: newPharmacy });
    } catch (error) {
        res.status(400).json({ message: 'Error adding pharmacy', error });
    }
};
