// function validateAndSanitize(input, {
//     rules = val => /^[a-zA-Z0-9\s]*$/.test(val),
//     sanitize = val => val.replace(/[^a-zA-Z0-9\s]/g, "")
// } = {}) {
//     const cleaned = sanitize(input);
//     const valid = rules(cleaned);
//     return {
//         cleaned,
//         valid
//     };
// }

// export default validateAndSanitize

function validateAndSanitize(input, {
    rules = val => /^[a-zA-Z0-9\s]*$/.test(val),
    sanitize = val => val.replace(/[^a-zA-Z0-9\s]/g, "")
} = {}) {
    const valid = rules(input);          // 注意这里
    const cleaned = sanitize(input);
    return {
        cleaned,
        valid
    };
}
export default validateAndSanitize
