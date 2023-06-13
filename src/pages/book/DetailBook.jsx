import { ShoppingCartOutlined } from "@ant-design/icons";
import { Col, Row, Modal, Rate, Button, Skeleton, Input, message } from "antd";
import { useState } from "react";
import { FaCarSide, FaCaravan } from "react-icons/fa";
import ReactImageGallery from "react-image-gallery";
import { useDispatch, useSelector } from "react-redux";
import { doOrder } from "../../redux/order/orderSlice";
import { useNavigate } from "react-router-dom";

const ViewDetail = (props) => {
    const dispatch = useDispatch()
    const { dataBook, image } = props
    const [isShowModal, setIsShowModal] = useState(false);
    const [x, setX] = useState(1);
    const user = useSelector(state => state.account.user)
    const navigate = useNavigate()
    const onClose = () => {
        setIsShowModal(false)
    }
    const images = image
    const onClick = () => {
        setIsShowModal(true)
    }

    const handleAddCarts = (quantity, book) => {
        if(user.email !==''){
            console.log(user)
            dispatch(doOrder({ quantity, detail: book, _id: book._id }))
            message.success('Sản phầm đã được thêm vào giỏ hàng')
        }
     else{
        navigate('/login')
     }
    }
    return (<>
        <Modal
            width={900}
            open={isShowModal}
            onCancel={onClose}
            cancelText={<></>}
            okType="ghost"
            okText={<></>}
            okButtonProps={{ disabled: true }}
            footer={<></>}

        ><ReactImageGallery
                items={images}
                showNav={false}
                showBullets={true}
                showIndex={false}
                showPlayButton={false}
                showFullscreenButton={false}
                autoPlay={false}
                slideOnThumbnailOver={false}
                thumbnailPosition='right'
            />
        </Modal>

        <Row
            gutter={[20, 20]}
        >

            <Col xxl={10} md={15} style={{ paddingLeft: 150, }}>
                <ReactImageGallery
                    items={images}
                    showNav={false}
                    showBullets={false}
                    showIndex={false}
                    showPlayButton={false}
                    autoPlay={false}
                    showFullscreenButton={false}
                    slideOnThumbnailOver={true}
                    onClick={() => onClick()}

                />
            </Col>
            <Col xxl={8} md={0} sm={0} style={{ paddingLeft: 50 }}>
                <div>
                    Tác giả: <span style={{ color: 'blue' }}>{dataBook.author}</span>
                </div>
                <div>
                    <span style={{ fontSize: 30 }}>{dataBook.mainText}</span>
                </div>
                <div>
                    Thể loại: {dataBook.category}
                </div>
                <div style={{ display: 'flex' }}>
                    <div>
                        <Rate defaultValue={5}></Rate>
                    </div>
                    <div style={{ paddingTop: 8, paddingLeft: 30 }}>
                        Đã bán: {dataBook.sold}
                    </div>
                </div>


                <div style={{ color: 'red', fontSize: 30 }}>
                    {dataBook.price} đ
                </div>

                <div>
                    Vận chuyển <FaCarSide style={{ color: 'green' }} /> Miễn phí vận chuyển
                    <div style={{ color: 'red', paddingLeft: 76 }} > <FaCaravan style={{ color: 'red' }} /> Vận chuyển tới </div>
                </div>
                <div style={{ display: 'flex' }} >
                    <div>Số lượng 
                        <Button onClick={() => {
                        if (x > 1) {
                            setX(x - 1)
                        }
                    }}>-</Button>  </div>
                    <div>  <Input
                        style={{ width: 55 }}
                        placeholder="1"
                        value={x}
                        onChange={(event) => {
                            setX(event.target.value)
                            if (event.target.value > dataBook.quantity) {
                                setX(dataBook.quantity)
                            }
                        }}
                    ></Input> </div>
                    <div>  <Button onClick={() => {
                        if (x < dataBook.quantity) {
                            setX(x + 1)
                        }
                    }}>+</Button> 
                    
                    <span style={{ color: 'red', fontSize: 13 }}>{dataBook.quantity} sản phẩm có sẵn</span>  </div>

                </div>
                <div style={{ display: 'flex', color: 'red' }}>
                    <Button
                        onClick={() => {
                            handleAddCarts(x, dataBook)
                        }}
                        style={{ border: '1px solid red', color: 'red', width: 200, height: 50, textAlign: 'center', fontWeight: 700 }}>
                        <ShoppingCartOutlined
                            style={{ paddingBottom: 5 }} />
                        Thêm vào giỏ hàng </Button>
                    <div style={{ paddingLeft: 20 }}>
                        <Button style={{ color: 'white', background: 'red', height: 50, textAlign: 'center', fontWeight: 700 }}>
                            Mua ngay </Button>
                    </div>
                </div>
            </Col>

        </Row>

    </>)


}
export default ViewDetail;