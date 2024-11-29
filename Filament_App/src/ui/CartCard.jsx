import { Link } from "react-router-dom";

export default function CartCard(props) {
  return (
    <div className="card mt-2 mb-2 mx-2 card-shadow bg-secondary text-white">
      <div className="card-body">
        <div className="d-flex align-items-center position-relative">

          {/* IMAGE */}
            <Link to={`/details/${props.product.product_id}`} >
                <img
                    src={`${props.apiHost}${props.product.image_filename}`}
                    className="img-thumbnail"
                    style={{ width: "225px", height: "auto", margin: "15px" }}
                    alt={"Image of " + props.product.name}
                />
            </Link>
          {/* CARD DATA */}
          <div className="product-info overflow-auto">
            <Link to={`/details/${props.product.product_id}`} >
                <h5 className="card-title">{props.product.name}</h5>
            </Link> 
            <p className="card-text">
              Cost: ${props.product.cost}
              <br />
              {`${props.apiHost}${props.product.image_filename}`}
            </p>
            <p className="card-text">{props.product.description}</p>
          </div>

          {/* {props.showLinks && (
            <div className="position-absolute top-0 end-0">
              <Link
                to={`/update/${props.product.id}`}
                className="btn btn-light btn-sm bg-secondary"
              >
                <i className="bi bi-pencil"></i>
              </Link>
              &nbsp;
              <Link
                to={`/delete/${props.product.id}`}
                className="btn btn-light btn-sm bg-secondary"
              >
                <i className="bi bi-trash"></i>
              </Link>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
