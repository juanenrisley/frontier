import {ProtoSchema} from "../model/protoDefinition";

export class protoDefinitionRepository {


    updateProtoVersion(proto) {

        const protoSaved = this.getProto(proto.name, proto.version);

        if (protoSaved) {
            protoSaved.content = proto.content;
            protoSaved.save();
        } else {
            const protoModel = new ProtoSchema(proto);
            protoModel.save()
        }
    }

    getProto(name, version) {
        return ProtoSchema.find({ name, version });
    }
}