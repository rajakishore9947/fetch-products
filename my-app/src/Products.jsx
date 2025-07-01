import React, {useState, useEffect} from "react";

const Products = () => {

    const [loading, setLoading] = useState(true);
    const [productsByCategory, setproductsByCategory] = useState({});

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then(data => {
            console.log(data);
            const grouped = data.reduce((acc, product) => {
                const {category} = product;
                if (!acc[category]) {
                    acc[category] = []
                }
                acc[category].push(product);
                return acc;
            }, {});
            setproductsByCategory(grouped);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }, []);

    if (loading) return <div>Loading...</div>
    return (
        <div style={{padding: '20px'}}>
            {Object.keys(productsByCategory).map((category) => (
                <div>
                    <h2>{category.toUpperCase()}</h2>
                    <div style={{display: 'flex', gap: '20px'}}>
                        {productsByCategory[category].map(product => (
                            <div>
                                <img src={product.image} style={{width: "100px", height: "100px", objectFit: 'contain'}}></img>
                                <h4>{product.title}</h4>
                                <p>${product.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products;