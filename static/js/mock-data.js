export const originalUsers = [
    {id: 'QTV0001', name: "Nguyen Thao", email: "thao@gmail.com", password: "123456", phone: "0905111111", role: "admin", status: 'active' },
    {id: 'TNV0001', name: "Vu Lien", email: "lien@gmail.com", password: "123456", phone: "0905222222", role: "volunteer", status: 'active' },
    {id: 'NHT0001', name: "Minh Huy", email: "huy@gmail.com", password: "123456", phone: "0905333333", role: "sponsor", status: 'active' },
    {id: 'NHT0002', name: "Van Cuong", email: "cuong@gmail.com", password: "123456", phone: "0905777777", role: "sponsor", status: 'inactive' },
    {id: 'GVN0001', name: "Ngoc Thu", email: "thu@gmail.com", password: "123456", phone: "0905444444", role: "teacher", status: 'active' },
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