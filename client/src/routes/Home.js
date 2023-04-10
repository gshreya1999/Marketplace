
export default function Home(props) {
    return (
      <div className='product'>
          <div key={props.itemName} className='productCard'>
          {props.previews &&
        props.previews.map((pic) => {
          return  <img src={pic} alt='product-img' className='productImage'></img>;
        })}  
              <div >
                  <h3 className='productName'>{props.itemName}</h3>
                  <p>{props.itemDescription}</p>
                    <span>Price: {props.itemPrice} ETH </span>
                    <div className='productTime'>Pick up Location : {props.itemPickupLocation}</div>
              </div>
              <div>
              <button className='button' >Buy</button>
              <button className='button' >Remove</button>
              </div>

          </div>
      </div>
  )
  }