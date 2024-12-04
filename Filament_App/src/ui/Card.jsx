import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <div className="card shadow-sm h-100">
      {/* Entire card wrapped in Link */}
      <Link
        to={`/details/${props.product.product_id}`}
        className="text-decoration-none"
        style={{ color: "inherit" }} // Prevent blue link styling / inherits text details from card
      >
        {/* Image Section */}
        <img
          src={`${props.apiHost}${props.product.image_filename}`}
          className="card-img-top"
          style={{ objectFit: "cover", maxHeight: "200px" }}
          alt={`Image of ${props.product.name}`}
        />

        {/* Card Body */}
        <div className="card-body d-flex flex-column bg-secondary text-white">
          {/* Product Name */}
          <h5 className="card-title fw-bold">{props.product.name}</h5>

          {/* Product Description */}
          <p
            className="card-text text-truncate"
            title={props.product.description}
          >
            {props.product.description}
          </p>

          {/* Product Price */}
          <p className="card-text">
            <strong>Cost:</strong> ${props.product.cost}
          </p>
        </div>
      </Link>
    </div>
  );
}
