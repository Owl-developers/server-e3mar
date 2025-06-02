import { Schema, model, Document as MongooseDocument } from "mongoose"; // Added MongooseDocument


const MemberSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
        index: {
            _userId: 1,
            unique: true
        }
    },
    _projectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Projects',
        index: {
            _projectId: 1,
            unique: true
        }
    },
    role: {
        type: String,
        enum: ['manager', 'engineer','worker', 'owner'],
        required: true
    },
}, {
    collection: "Members",
    timestamps: true,
});

const MemberModel = model('Members', MemberSchema);

export default MemberModel;
