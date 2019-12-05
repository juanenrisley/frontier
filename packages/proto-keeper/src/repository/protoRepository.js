import {Proto} from "../model/protoDefinition";

export const updateProtoVersion = async (proto) => {

    let protoSaved = await this.getProto(proto.name, proto.version);

    if (!protoSaved) {
        const protoModel = new Proto(proto);
        protoSaved = await protoModel.save();
    }
    const {name, version, content} = protoSaved;
    return {name, version, content};
};

export const getProto = (name, version) => {
    return Proto.findOne({name, version}).lean();
};

