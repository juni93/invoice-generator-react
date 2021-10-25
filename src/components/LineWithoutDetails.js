import { MdCancel as DeleteIcon } from 'react-icons/md'

const LineWithoutDetails = ({index, descripton, price, changer, deleter, formatter }) => {

	return (
		<div className="row mt-2">
			<div className="col-sm-9">
				<textarea rows={3} className="form-control" name="description" value={descripton} onChange={changer(index)}/>
			</div>
			<div className="col-sm-2">
				<input type="number" className="form-control" name="price" step="0.01" min="0.00" max="9999999.99" value={price} onChange={changer(index)}/>
			</div>
			<div className="col-sm-1">
				<button type="button" className="btn btn-danger" onClick={deleter(index)}><DeleteIcon size="1.25em" /></button>
			</div>
		</div>
	)
}

export default LineWithoutDetails