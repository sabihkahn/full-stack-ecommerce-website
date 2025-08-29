import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showeratingpopup, setshoweratingpopup] = useState(false)
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState("");
    const user = localStorage.getItem('user')
    const userparsing = JSON.parse(user)
    const userid = userparsing._id
    const [productid, setproductid] = useState('')
    const [quantity, setQuantity] = useState(1);
    const [popup, setpopup] = useState(false)
    const [againgivingstart, setagaingivingstart] = useState(false)
    const navigate = useNavigate()
    console.log(userid);

    // inside ProductDetail component:
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    // ⭐ submit rating API
    const submitRating = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/updaterating/${productid}/${userid}`,
                { rating }
            );

            setshoweratingpopup(true);

          
            setTimeout(() => {
                setshoweratingpopup(false);
            }, 2000);

            
            setProduct((prev) => ({
                ...prev,
                ratings: ((prev.ratings * prev.allrating?.length + rating) / ((prev.allrating?.length || 0) + 1)).toFixed(1)
            }));

        } catch (error) {
            console.error(error);

            setagaingivingstart(true);
            setTimeout(() => {
                setagaingivingstart(false);
            }, 2000);
        }
    };




    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/getSingleProduct/${id}`
                );
                setProduct(res.data.products);
                setMainImage(res.data.products.img);
                setproductid(res.data.products._id)
                console.log("Product:", res.data.products);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    if (loading) {
        return (
            <div className="text-center py-10 text-lg font-medium">
                Loading product details...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-10 text-lg font-medium">
                Product not found
            </div>
        );
    }


    const decrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increase = () => {
        setQuantity(quantity + 1);
    };

    const addtocart = async () => {
        try {
            const addtocart = await axios.post(`${import.meta.env.VITE_BASE_URL}/add-to-cart/${userid}`, {
                productID: productid,
                quantity: quantity
            }).then(() => {
                setpopup(true)
                setTimeout(() => {
                    navigate('/shop')
                }, 1000)
            })
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <>
            <div className="mb-34">

                <Navbar />
            </div>
            <div className="p-6 mt-24 mb-23 max-w-5xl mx-auto bg-white shadow-xl rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>

                    <div className="flex justify-center items-center">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full max-w-md h-80 object-cover rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
                        />
                    </div>


                    {product.extraimages && product.extraimages.length > 0 && (
                        <div className="mt-4 flex gap-4 justify-center flex-wrap">
                            {product.extraimages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`extra-${index}`}
                                    onMouseEnter={() => setMainImage(img)}
                                    onClick={() => setMainImage(img)}
                                    className="w-24 h-24 object-cover rounded-lg border shadow hover:scale-105 transition-transform duration-200 cursor-pointer"
                                />
                            ))}
                        </div>
                    )}
                </div>


                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="text-gray-600 mt-3 text-lg">{product.description}</p>


                    <div className="mt-5 flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">
                            ${product.price}
                        </span>
                        <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                    </div>


                    <div className="mt-4 space-y-2">
                        <p className="text-gray-700">
                            <span className="font-semibold">Brand:</span> {product.brand}
                        </p>
                        <div className="flex items-center space-x-2">
                            <FaStar className="text-yellow-400 text-2xl" />
                            <span className="font-semibold text-lg">{product.ratings}</span>
                            <span className="text-gray-500 text-sm">(Total Ratings)</span>
                        </div>
                        <p className="text-gray-700">
                            <span className="font-semibold">Discount:</span>{" "}
                            {product.discount}%
                        </p>
                    </div>



                    <button onClick={addtocart} className="mt-6 w-full py-3 bg-black text-white rounded-xl text-lg font-medium hover:bg-gray-800 transition">
                        Add to Cart
                    </button>
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Rate this Product:</h3>
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                            className="hidden"
                                        />
                                        <FaStar
                                            size={30}
                                            className="cursor-pointer transition-colors"
                                            color={
                                                ratingValue <= (hover || rating)
                                                    ? "#ffc107"
                                                    : "#1C1C1C"
                                            }
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>

                        {rating > 0 && (
                            <button
                                onClick={submitRating}
                                className="mt-3 px-5 py-2 bg-yellow-300 hover:bg-yellow-400 text-black rounded-lg"
                            >
                                Submit Rating ({rating}⭐)
                            </button>
                        )}
                    </div>

                </div>
                <div className="flex items-center gap-4">

                    <button
                        onClick={decrease}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                        <FaMinus className="text-gray-700" />
                    </button>


                    <span className="text-lg font-semibold w-10 text-center">{quantity}</span>


                    <button
                        onClick={increase}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                        <FaPlus className="text-gray-700" />
                    </button>
                </div>
            </div>
            {popup ? <div className="fixed top-24 right-5 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg text-lg font-medium flex items-center gap-2 animate-bounce">
                ✅ Product added to cart successfully!
            </div> : ""}
            {showeratingpopup ? <div className="fixed top-24 right-5 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg text-lg font-medium flex items-center gap-2 animate-bounce">
                rating added sucessfully
            </div> : ""}
            {againgivingstart ? <div className="fixed top-24 right-5 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-lg text-lg font-medium flex items-center gap-2 animate-bounce">
                you already added rating
            </div> : ""}

            <Footer />
        </>
    );
};

export default ProductDetail;
