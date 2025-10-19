export const originalUsers = [
    {id: 1, name: "Nguyen Thao", email: "thao@gmail.com", password: "123456", phone: "0905111111", role: "admin" },
    {id: 2, name: "Vu Lien", email: "lien@gmail.com", password: "123456", phone: "0905222222", role: "volunteer" },
    {id: 3, name: "Minh Huy", email: "huy@gmail.com", password: "123456", phone: "0905333333", role: "sponsor" },
    {id: 4, name: "Ngoc Thu", email: "thu@gmail.com", password: "123456", phone: "0905444444", role: "teacher" },
];


export const accessControlList = {
    'admin': {
        configUser: true,
        viewStudent: true,
        editStudent: true,
        viewSponsor: true,
        editSponsor: true,
        viewSchool: true,
        editSchool: true,
        viewTransactionRecord: true,
        editTransactionRecord: true
    },
    'volunteer': {
        configUser: false,
        viewStudent: true,
        editStudent: true,
        viewSponsor: true,
        editSponsor: true,
        viewSchool: true,
        editSchool: true,
        viewTransactionRecord: true,
        editTransactionRecord: true
    },
    'sponsor': {
        configUser: false,
        viewStudent: true,
        editStudent: false,
        viewSponsor: true,
        editSponsor: false,
        viewSchool: false,
        editSchool: false,
        viewTransactionRecord: true,
        editTransactionRecord: false
    },
    'teacher': {
        configUser: false,
        viewStudent: true,
        editStudent: true,
        viewSponsor: false,
        editSponsor: false,
        viewSchool: true,
        editSchool: true,
        viewTransactionRecord: false,
        editTransactionRecord: false
    },
}