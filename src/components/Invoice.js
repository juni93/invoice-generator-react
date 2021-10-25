import { useState } from 'react'
import LineItems from './LineItems'
import { v4 as uuidv4 } from 'uuid';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument'
import LinesWithoutDetails from './LinesWithoutDetails';

const Invoice = () => {

	const [taxRate, setTaxRate] = useState(0)
	const [chantier, setChantier] = useState(false)
	const [withDetails, setWithDetails] = useState(false)
	const [chantierDetails, setChantierDetails] = useState('')
	const [facNo, setFacNo] = useState('')
	const [facDate, setFacDate] = useState('')
	const [provider, setProvider] = useState('')
	const [clientData, setClientData] = useState(
		{
			name: '',
			address: '',
			city: '',
		}
	)


	const [lineItems, setLineItems] = useState([
		{
			id: 'initial',
			description: '',
			quantity: 0,
			price: 0.00,
		}
	])


	const formatCurrency = (amount) => {
		//return amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
		return (new Intl.NumberFormat('it-IT', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(amount))
	}

	const handleLineItemChange = (elemenIndex) => (e) => {
		let newLineItems = lineItems.map((item, i) => {
			if (elemenIndex !== i) return item
			return { ...item, [e.target.name]: e.target.value }
		})
		setLineItems(newLineItems)
	}

	const handleFocusSelect = (e) => {
		e.target.select()
	}

	const handleAddLine = (e) => {
		setLineItems([...lineItems, {
			id: uuidv4(),
			description: '',
			quantity: 0,
			price: 0.00,
		},
		])
	}

	const handleDeleteLine = (elemenIndex) => (e) => {
		let newItems = lineItems.filter((item, i) => {
			return elemenIndex !== i
		})
		setLineItems(newItems);
	}

	const calcLineItemsTotal = () => {
		return withDetails ?
		lineItems.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
		:
		lineItems.reduce((prev, cur) => (prev + (1 * cur.price)), 0)
	}

	const calcTaxTotal = () => {
		return calcLineItemsTotal() * (taxRate / 100)
	}

	const calcGrandTotal = () => {
		return calcLineItemsTotal() + calcTaxTotal()
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md">
					<select className="form-select" aria-label="Default select example" value={provider} onChange={(e) => setProvider(e.target.value)}>
						<option defaultValue>Choisir le fournisseur</option>
						<option value="it-reno">It Renovation</option>
						<option value="sasu-tce">Sasu Tce</option>
						<option value="cfr-bat">CFR Bat</option>
					</select>
					<div className="form-floating mt-2">
						<input type="text" className="form-control" id="floatingInputGridFacture" value={facNo} onChange={(e) => setFacNo(e.target.value)}></input>
						<label htmlFor="factureField" className="form-label">Facture #</label>
					</div>
					<div className="form-floating mt-2">
						<input type="date" className="form-control" id="floatingInputGridDate" value={facDate} onChange={(e) => setFacDate(e.target.value)} />
						<label htmlFor="dateField" className="form-label">Date</label>
					</div>

				</div>
				<div className="col-md mt-2 mt-md-0">
					<div className="form-floating">
						<input type="text" className="form-control" id="companyName" value={clientData.name} onChange={(e) => setClientData({ ...clientData, name: e.target.value })}></input>
						<label htmlFor="companyName" className="form-label">Nome du client</label>
					</div>
					<div className="form-floating">
						<input type="text" className="form-control" id="companyAddress" value={clientData.address} onChange={(e) => setClientData({ ...clientData, address: e.target.value })}></input>
						<label htmlFor="companyAddress" className="form-label">Adresse</label>
					</div>
					<div className="form-floating">
						<input type="text" className="form-control" id="companyCity" value={clientData.city} onChange={(e) => setClientData({ ...clientData, city: e.target.value })}></input>
						<label htmlFor="companyCity" className="form-label">Ville</label>
					</div>
				</div>
			</div>
			<div className="row mt-2">
				<div className="col">
					<div className="form-check">
						<input className="form-check-input" type="checkbox" id="chantier" defaultChecked={chantier} onChange={() => setChantier(!chantier)} />
						<label className="form-check-label" htmlFor="chantier">Chantier?</label>
					</div>
					{chantier &&
						<div className="form-floating">
							<textarea className="form-control" id="chantierDetails" value={chantierDetails} onChange={(e) => setChantierDetails(e.target.value)}></textarea>
							<label htmlFor="chantierDetails" className="form-label" >Détails du Chantier</label>
						</div>
					}
				</div>
			</div>
			<div className="row mt-2">
				<div className="col">
					<div className="form-check">
						<input className="form-check-input" type="checkbox" id="details" defaultChecked={withDetails} onChange={() => setWithDetails(!withDetails)} />
						<label className="form-check-label" htmlFor="details">Avec Details</label>
					</div>
					{withDetails ?
						<LineItems items={lineItems} addHandler={handleAddLine} deleteHandler={handleDeleteLine} changeHandler={handleLineItemChange} currencyFormatter={formatCurrency} />
						:
						<LinesWithoutDetails items={lineItems} addHandler={handleAddLine} deleteHandler={handleDeleteLine} changeHandler={handleLineItemChange} currencyFormatter={formatCurrency} />
					}
				</div>
			</div>
			<div className="row mt-2">
				<div className="col-md-3">
					<div className="input-group flex-nowrap">
						<span className="input-group-text" id="addon-wrapping">T.V.A %</span>
						<input type="number" className="form-control" step="0.01" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} onFocus={handleFocusSelect} id="floatingInputGridVat" />
					</div>
				</div>
				<div className="col-md-5 offset-md-5">
					<div className="input-group flex-nowrap">
						<span className="input-group-text" id="addon-wrapping">Total HT</span>
						<div className="form-control">{formatCurrency(calcLineItemsTotal())}</div>
					</div>
					<div className="input-group flex-nowrap">
						<span className="input-group-text" id="addon-wrapping">T.V.A</span>
						<div className="form-control">{formatCurrency(calcTaxTotal())}</div>
					</div>
					<div className="input-group flex-nowrap">
						<span className="input-group-text" id="addon-wrapping">Total TTC</span>
						<div className="form-control">{formatCurrency(calcGrandTotal())}</div>
					</div>
				</div>
			</div>
			<div className="row mt-2">
				<div className="col">
					<PDFDownloadLink document={<PdfDocument tax={taxRate} withDetails={withDetails} chantier={chantier} chantierDetails={chantierDetails} fac={facNo} facDate={facDate} provider={provider} client={clientData} items={lineItems} totalTax={calcTaxTotal} totalItemsPrice={calcLineItemsTotal} grandTotal={calcGrandTotal} currencyFormatter={formatCurrency} />} fileName={facNo + clientData.name + '.pdf'}>
						{({ blob, url, loading, error }) => loading ? <p>Chargement...</p> : <button type="button" className="btn btn-primary">Télécharger le PDF</button>
						}
					</PDFDownloadLink>

				</div>
			</div>
		</div>
	)
}

export default Invoice