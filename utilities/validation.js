function emailValidation(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}
function pwdValidation(password){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password)
}
// checking all fields are filled
function validationFields(fields){
    return fields.every(field=>field)
}
function mobileValidation(mobile){
    const mobilenumregex = /^\d{10}$/
    return mobilenumregex.test(mobile)
}
function confirmPwd(password,confirmPwd){
    return password === confirmPwd
}

module.exports = {
    emailValidation,
    pwdValidation,
    validationFields,
    confirmPwd,
    mobileValidation
}