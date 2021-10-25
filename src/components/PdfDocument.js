import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import { getSupplierData } from '../utils'

// Create Document Component
const PdfDocument = ({withDetails, chantier, chantierDetails, client, currencyFormatter, fac, facDate, grandTotal, items, provider, tax, totalItemsPrice, totalTax}) => {
	let imgSrc = "./images/blank.jpg"
	const supplierData = getSupplierData(provider)
	return (
		<Document>
			<Page style={styles.body}>
				<Image
					style={styles.image}
					src={supplierData ? supplierData.imagePath : imgSrc}
				/>
				<View style={styles.flexSpace}>
					<View>
						<Text style={{fontSize: 12}}>Facture # {fac}</Text>
						<Text style={{fontSize: 12}}>Date {facDate}</Text>
					</View>
					<View>
						<Text>{client.name}</Text>
						<Text>{client.address}</Text>
						<Text>{client.city}</Text>
					</View>
				</View>

				{chantier && <Text>Chantier: {chantierDetails}</Text>}
				<View style={styles.table}>
					<View style={styles.tableRow}>
						<View style={withDetails ? styles.tableColDesc : styles.tableColDescWithoutDetails}>
							<Text style={styles.tableCell}>Description</Text>
						</View>
						{
							withDetails &&
							<View style={styles.tableColQty}>
								<Text style={styles.tableCell}>Qty</Text>
							</View>
						}
						{
							withDetails &&
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>P Unit</Text>
							</View>
						}
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>P Total</Text>
						</View>
					</View>
					{items.map((item, i) => (
						<View key={i} style={styles.tableRow}>
							<View style={withDetails ? styles.tableColDesc : styles.tableColDescWithoutDetails}>
								<Text style={styles.tableCell}>{item.description}</Text>
							</View>
							{
								withDetails &&
								<View style={styles.tableColQty}>
									<Text style={styles.tableCell}>{item.quantity}</Text>
								</View>
							}
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>{item.price}</Text>
							</View>
							{
								withDetails &&
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>{currencyFormatter(item.quantity * item.price)}</Text>
								</View>
							}
						</View>
					))}
				</View>
				<View style={styles.flexSpace}>
					<View>
						<Text style={styles.totalTitles}>T.V.A: {tax}%</Text>
					</View>
					<View>
						<View style={styles.flexSpace}>
							<Text style={styles.totalTitles}>Total HT: </Text>
							<Text style={styles.totalValues}> {currencyFormatter(totalItemsPrice())} </Text>
						</View>
						<View style={styles.flexSpace}>
							<Text style={styles.totalTitles}>Total T.V.A: </Text>
							<Text style={styles.totalValues}> {currencyFormatter(totalTax())} </Text>
						</View>
						<View style={styles.flexSpace}>
							<Text style={styles.totalTitles}>Total TTC:  </Text>
							<Text style={styles.totalValues}> {currencyFormatter(grandTotal())}  </Text>
						</View>
					</View>
				</View>
				<View style={styles.notes}>
					<Text>VALUER EN VOTRE A IMABLE REGLEMENT AU JUOR DE RECEPTION FACTURE REGLEMENT PAR VIREMENT BANCAIRE</Text>
				</View>
				<View style={styles.footerNotes}>
					<Text>{supplierData ? supplierData.footer.firstLine : ''}</Text>
					<Text>{supplierData ? supplierData.footer.secondLine: ''}</Text>
					<Text>{supplierData ? supplierData.footer.thirdLine: ''}</Text>
				</View>
			</Page>
		</Document>
	)
}

const styles = StyleSheet.create({
	body: {
		padding: 30,
		fontSize: 12
	},
	image: {
		width: 350,
		display: "block",
		marginRight: "auto",
		marginLeft: "auto"
	},
	flexSpace: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	table: {
		display: "table",
		width: "auto",
		borderStyle: "solid",
		marginTop: 30,
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0
	},
	tableRow: {
		margin: "auto",
		flexDirection: "row"
	},
	tableColDesc: {
		width: "50%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0
	},
	tableColDescWithoutDetails: {
		width: "80%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0
	},
	tableCol: {
		width: "20%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0
	},
	tableColQty: {
		width: "10%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0
	},
	tableCell: {
		margin: "auto",
		marginTop: 5,
		fontSize: 12
	},
	notes: {
		marginTop: 20,
		fontSize: 9,
		textAlign: "center",
		marginRight: "10%",
		marginLeft: "10%"
	},
	footerNotes: {
		position: "absolute",
		bottom: 30,
		right: 0,
		left: 0,
		textAlign: "center",
		fontSize: 12,
	},
	totalTitles: {
		borderWidth: 1,
		padding: 5,
		width: 150,
		fontSize: 12
	},
	totalValues: {
		borderWidth: 1,
		padding: 5,
		width: 150,
		textAlign: "center",
		fontSize: 12
	}
});
export default PdfDocument;