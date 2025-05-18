import { Schema, model } from "mongoose";
interface MemberDocument extends Document {
    username: Schema.Types.ObjectId;
    email: string;
    phone: string;
    role: 'manager' | 'engineer' | 'worker' | 'owner';
    projects: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const MemberSchema = new Schema<MemberDocument>({
    username: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
        unique: true
    },

    role: {
        type: String,
        enum: ['manager', 'engineer', "worker",'worker'],
        required: true
    },
    projects: {
        type: Schema.Types.ObjectId,
        ref: 'Projects'
    }
}, {collection: "Members", timestamps: true });

const MemberModel = model('Members', MemberSchema);

export default MemberModel;
