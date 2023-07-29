const createError = require("http-errors");
const Cart = require("../../models/Cart.model");
const { cartValidation } = require("../../services/validation_schema");
const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const { _id: userId } = req.user;
    console.log(req.user, "req.user");
    const alreadyExistInCart = await Cart.findOne({
      productId: ObjectId(productId),
    });
    let updatedQuantity = quantity;
    let cart = {};

    if (alreadyExistInCart) {
      if (quantity > alreadyExistInCart.quantity) {
        updatedQuantity = quantity - alreadyExistInCart.quantity;
        
        cart=  await Cart.findOneAndUpdate(
          {
            productId: ObjectId(productId),
          },
          {
            $inc: {
              quantity: updatedQuantity,
            },
          },
          {
            new: true,
          }
        );
      } else {

        updatedQuantity = alreadyExistInCart.quantity - quantity;
      console.log('quantity',quantity , 'alreadyExistInCart.quantity',alreadyExistInCart.quantity,'updatedQuantity',updatedQuantity)
      cart=  await Cart.findOneAndUpdate(
        {
          productId: ObjectId(productId),
        },
        {
          $inc: {
            quantity: -Number(updatedQuantity),
          },
        },
        {
          new: true,
        }
      );

      }
     
    } else if (!alreadyExistInCart) {
      cart = new Cart({
        productId,
        quantity,
        userId,
      });
      await cart.save();
    }
    res.json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addToCart;
