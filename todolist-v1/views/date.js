
exports.getDate =function() {
    let today = new Date();

    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", option);

    return day;
}

exports.getDay =function() {
    let today = new Date();

    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", option);

    return day;
}