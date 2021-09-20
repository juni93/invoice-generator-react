import { MdCancel as DeleteIcon } from 'react-icons/md'

const LineItem = ({index, descripton, quantity, price, changer, deleter, formatter }) => {

	return (
		<div className="row mt-2">
			<div className="col-sm-5">
				<input type="text" className="form-control" name="description" value={descripton} onChange={changer(index)}/>
			</div>
			<div className="col-sm-2">
				<input type="number" className="form-control" name="quantity" step="1" value={quantity} onChange={changer(index)}/>
			</div>
			<div className="col-sm-2">
				<input type="number" className="form-control" name="price" step="0.01" min="0.00" max="9999999.99" value={price} onChange={changer(index)}/>
			</div>
			<div className="col-sm-2">
				<div className="form-control">{formatter(quantity * price)}</div>
			</div>
			<div className="col-sm-1">
				<button type="button" className="btn btn-danger" onClick={deleter(index)}><DeleteIcon size="1.25em" /></button>
			</div>
		</div>
	)
}

export default LineItem