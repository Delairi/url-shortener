function isUrl({ str }: { str: string }) {
    console.log(str)
    const urlRegex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return urlRegex.test(str);
}

export default isUrl;