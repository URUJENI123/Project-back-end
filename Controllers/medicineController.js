import Medicine from '../Models/medicineModel.js';

export const createStock = async (req, res) => {
    const { pharmacyId, name, availableStock } = req.body;

    try {
        const newMedicine = new Medicine({ pharmacyId, name, availableStock });
        await newMedicine.save();
        res.status(201).json ({ message: 'Stock created', medicine: newMedicine });
        } catch (error) {
            res.status(400).json({ message:'Error creating stock', error });
        }
    };

export const updateMedicine = async (req, res) => {
    const { pharmacyId, name, availableStock } = req.body;

    try {
        const newMedicine = new Medicine({ pharmacyId, name, availableStock });
        await newMedicine.save();
        res.status(201).json({ message:'Stock updated', medicine: newMedicine });
    } catch (error) {
        res.status(400).json({ message: 'Error updating stock', error });
    }
};
