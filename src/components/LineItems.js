
import LineItem from "./LineItem"
import { MdAddCircle as AddIcon } from 'react-icons/md'

const LineItems = ({items, addHandler, deleteHandler, changeHandler, currencyFormatter}) => {

	return (
		<form>
			<div className="row mt-2">
				<div className="col-sm-5">
					<p>Description</p>
				</div>
				<div className="col-sm-2">
					<p>Qty</p>
				</div>
				<div className="col-sm-2">
					<p>Prix ​​unitaire</p>
				</div>
				<div className="col-sm-2">
					<p>Prix total</p>
				</div>
				<div className="col-sm-1">
					<p>Effacer</p>
				</div>
			</div>

			{items.map((item, i) => (
				<LineItem key={i + item.id} index={i} description={item.description} quantity={item.quantity} price={item.price} changer={changeHandler} deleter={deleteHandler} formatter={currencyFormatter} />
			))}



			<div className="row mt-2">
				<div className="col">
					<button type="button" className="btn btn-info" onClick={addHandler}><AddIcon size="1.25em" /> Nouvel article</button>
				</div>
			</div>
		</form>
	)
}

export default LineItems