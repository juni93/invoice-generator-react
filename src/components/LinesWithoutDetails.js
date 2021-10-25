
import { MdAddCircle as AddIcon } from 'react-icons/md'
import LineWithoutDetails from "./LineWithoutDetails"

const LinesWithoutDetails = ({items, addHandler, deleteHandler, changeHandler, currencyFormatter}) => {

	return (
		<form>
			<div className="row mt-2">
				<div className="col-sm-9">
					<p>Description</p>
				</div>
				<div className="col-sm-2">
					<p>Prix total</p>
				</div>
				<div className="col-sm-1">
					<p>Effacer</p>
				</div>
			</div>

			{items.map((item, i) => (
				<LineWithoutDetails key={i + item.id} index={i} description={item.description} price={item.price} changer={changeHandler} deleter={deleteHandler} formatter={currencyFormatter} />
			))}



			<div className="row mt-2">
				<div className="col">
					<button type="button" className="btn btn-info" onClick={addHandler}><AddIcon size="1.25em" /> Nouvel article</button>
				</div>
			</div>
		</form>
	)
}

export default LinesWithoutDetails