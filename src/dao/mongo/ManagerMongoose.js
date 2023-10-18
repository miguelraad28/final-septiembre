import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export class ManagerMongoose {
    constructor(collectionName, schema) {
        const newSchema = new mongoose.Schema(schema, { versionKey: false });
        newSchema.plugin(mongoosePaginate);
        this.collection = mongoose.model(collectionName, newSchema);
    }

    async create(record) {
        return await this.collection.create(record);
    }

    // async read(filter = {}) {
    //     if (typeof filter === 'object' && !Array.isArray(filter)) {
    //         const result = await this.collection.findOne(filter).lean();
    //         result._id = result._id.toString()
    //         return result
    //     } else {
    //         const results = await this.collection.find(filter).lean();
    //         return results.map(result => {
    //             result._id = result._id.toString()
    //             return result
    //         })
    //     }
    // }

    async read(filter = {}) {
        if (typeof filter === 'object' && !Array.isArray(filter)) {
            const result = await this.collection.findOne(filter).lean();
            if (result) {
                result._id = result._id.toString();
                return result;
            } else {
                return []
            }
        } else {
            const results = await this.collection.find(filter).lean();
            return results.map(result => {
                result._id = result._id.toString();
                return result;
            });
        }
    }

    async readAndPopulate(filter = {}) {
        if (typeof filter === 'object' && !Array.isArray(filter)) {
            const result = await this.collection.findOne(filter).populate('listProducts.productId').lean();
            if (result) {
                result._id = result._id.toString();
                return [result]; // Devolver un array con un solo elemento
            } else {
                return []; // Devolver un array vacío si no hay resultado
            }
        } else {
            const results = await this.collection.find(filter).populate('listProducts.productId').lean();
            return results.map(result => {
                result._id = result._id.toString();
                return result;
            });
        }
    }
    async update(filter, updatedData) {
        const options = { new: true, upsert: false, multi: true };

        // EJEMPLO Actualizar un solo documento
        // const filter = { _id: 'documento_id' };
        // const updatedData = { name: 'John Doe', age: 30 };
        // const updatedDocument = await manager.update(filter, updatedData);
        if (typeof filter === 'object' && !Array.isArray(filter)) {
            const updatedDocument = await this.collection.findOneAndUpdate(filter, updatedData, options).lean();
            updatedDocument._id = updatedDocument._id.toString();
            return updatedDocument;
        } else {
            // Actualizar varios documentos
            // const filter = { status: 'active' };
            // const updatedData = { status: 'inactive' };
            // const updateResult = await manager.update(filter, updatedData);
            return await this.collection.updateMany(filter, updatedData, options).lean();
        }
    }


    async delete(filter = {}) {
        if (typeof filter === 'object' && !Array.isArray(filter)) {
            return await this.collection.findOneAndDelete(filter);
        } else {
            const result = await this.collection.deleteMany(filter);
            return result.deletedCount;
        }
    }

    async getIdByProperty(property, value) {
        const document = await this.collection.findOne({ [property]: value }).select('_id').lean();
        return document ? document._id : null;
    }


    async paginate(filter = {}, options = {}) {
        const { page = 1, limit = 10 } = options;
        const paginatedResults = await this.collection.paginate(filter, { page, limit });
        const leanResults = paginatedResults.docs.map(doc => doc.toObject());
        paginatedResults.docs = leanResults;
        return paginatedResults;
    }

}
