import {Proto} from "../model/protoDefinition";

export const updateProtoVersion = async (proto) => {

    let protoSaved = await this.getProto(proto.name, proto.version);

    if (!protoSaved) {
        const protoModel = new Proto(proto);
        protoSaved = await protoModel.save()
    }

    return {name: protoSaved.name, version: protoSaved.version, content:protoSaved.content};
}

export const getProto = (name, version) => {
    return Proto.findOne({name, version}).lean();
};

