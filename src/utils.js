import companies from './suppliers.json'

export const getSupplierData = (choice) => {
	return companies.find(obj => {
		return obj.company === choice
	})
}