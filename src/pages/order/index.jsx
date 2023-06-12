import { Avatar, Button, Col, Input, Modal, Popconfirm, Popover, Result, Row, Steps } from "antd";
import React, { useEffect, useState } from 'react';
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { CreditCardOutlined, DeleteOutlined, GiftOutlined, LoadingOutlined, SmileOutlined } from "@ant-design/icons";
import { doBuyItem, doDeleteItem, doMinusOrder, doPlusOrder } from "../../redux/order/orderSlice";
import './index.scss'
import { createOrder, updateBook } from "../../service/api";
import { current } from "@reduxjs/toolkit";
import { NavLink, useNavigate } from "react-router-dom";
// import Avtnodataoder from '../../assets/Capture.PNG/?url'

const Order = () => {
    const navigate = useNavigate()
    const { TextArea } = Input;
    const user = useSelector(state => state.account.user)
    const carts = useSelector(state => state.order.carts)
    const dispatch = useDispatch()
    const [totalMonney, setTotalMonney] = useState(0)
    const [totalWillBuy, setTotalWillBuy] = useState(0)
    const [itemWillBuy, setItemWillBuy] = useState([])
    const [currentStep, setCurrentStep] = useState(-1);
    const [address, setAddress] = useState('')
    const [showbtnBuy, setShowbtnBuy] = useState(true)
    const [titleBtn, setTitleBtn] = useState('Vui lòng nhập địa chỉ')
    const title = (<>
        Sản phẩm ({carts.length})
    </>)
    const [isShowMinus,setIsShowMinus] = useState(false)
    const handleMinus = (record) => {
        dispatch(doMinusOrder(record))
        if (record.quantity < 1) {
            setIsShowMinus(true)
        }

        itemWillBuy.map(item => {
            if (item.key === record.key && record.quantity > 0) {
                setTotalMonney(totalMonney - record.price)
            }
        })
    }
    const handlePlus = (record) => {
        dispatch(doPlusOrder(record))
        itemWillBuy.map(item => {
            if (item.key === record.key) {
                setTotalMonney(totalMonney + record.price)
            }
        })
    }
    const handleDeleteBookCarts = (record) => {
        console.log('check rec', record)
        dispatch(doDeleteItem(record))
        setIsShowMinus(false)
        let is = itemWillBuy.findIndex(item => item.key == record.key);
        if (is > -1) {
            setTotalWillBuy(totalWillBuy - 1)
            setTotalMonney(totalMonney - record.price * record.quantity)
        }
    }
    const onClose = () => {
        setIsShowModalDeLeTe(false)
    }
    const columns = [
        {
            title: title,
            dataIndex: 'thumbnail',
            render: (text, record) => {
                return (
                    <div style={{ display: 'flex' }}>
                        <div>   <Avatar
                            style={{ width: 60 }}
                            src={`${import.meta.env.VITE_BASE_URL}/images/book/${record.thumbnail}`}
                        /> </div>
                        <div> {record.mainText} </div>
                    </div>
                )
            },
            width: 600
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (_, record) => {
                return (
                    <>
                        <Modal
                            title="Xóa sản phẩm"
                            centered
                            open={isShowMinus}
                            onOk={() => handleDeleteBookCarts(record)}
                            onCancel={() => setIsShowMinus(false)}
                        >
                            <p>Bạn có muốn xóa sản phẩm đang chọn ?</p>
                        </Modal>
                        <Button onClick={() => {
                            handleMinus(record)
                        }}>-</Button>
                        {record.quantity}
                        <Button onClick={() => {
                            handlePlus(record)
                        }}>+</Button>
                    </>
                )
            }
        },
        {
            title: 'Thành tiền',
            dataIndex: 'price',
            render: (_, record) => {
                return (<>
                    {(record.quantity * record.price).toLocaleString().replace(/,/g, " ",)}
                </>)
            }
        },
        {
            render: (_, record) => {
                return (<>
                    <Popconfirm
                        onConfirm={() => handleDeleteBookCarts(record)}
                        title='Xóa sản phẩm này ??'>
                        <DeleteOutlined
                        />
                    </Popconfirm>

                </>)
            }

        },
    ];

    let dataBuy = carts.map(item => {
        return {
            key: item._id,
            thumbnail: item.detail.thumbnail,
            quantity: item.quantity,
            price: item.detail.price,
            mainText: item.detail.mainText,
            slider: item.detail.slider,
            author: item.detail.author,
            category: item.detail.category,
            sold: item.detail.sold
        }
    })
    const data = dataBuy;

    const rowSelection = {

        onChange: (key, item) => {
            setCurrentStep(1);
            if (key.length && item.length > 0) {
                setItemWillBuy(item)

                let data = item.map(item => item.quantity * item.price)
                let total = data.reduce((a, b) => a + b)
                // setTotalMonney(total);
                setTotalMonney(total)
                setTotalWillBuy(item.length)
            }
            else {
                setTotalMonney(0)
                setItemWillBuy([])
                setCurrentStep(0);
            }
            console.log('check order', itemWillBuy, totalMonney)

        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        })
    };
    // console.log('check order', itemWillBuy, totalMonney)


    const handleBuyCarts = async (itemWillBuy) => {
        setTimeout(async () => {
            if (totalMonney > 0) {
                console.log('checl ca', carts)
                let res = itemWillBuy.map(async (item) => {
                    let x = carts.filter(c => c._id === item.key)
                    let data1 = {
                        thumbnail: item.thumbnail,
                        slider: item.slider,
                        mainText: item.mainText,
                        author: item.author,
                        price: item.price,
                        sold: item.sold + item.quantity,
                        quantity: x[0].detail.quantity - item.quantity,
                        category: item.category
                    }

                    await updateBook(item.key, data1)
                }
                )
                console.log(user)
                const dataOrder = {
                    name: user.fullName,
                    address: address,
                    phone: user.phone,
                    totalPrice: totalMonney,
                    detail: [
                        {
                            bookName: 'item.mainText',
                            quantity: 6,
                            _id: '647a0ee0c73682490b2cb1ae'
                        }
                    ]
                }
                let res3 = await createOrder(dataOrder);
            }




            dispatch(doBuyItem(itemWillBuy))
            if (itemWillBuy && itemWillBuy.length > 0) {

                navigate('/order/success')
            }
        }, 500)
        if (itemWillBuy && itemWillBuy.length > 0) {
            setCurrentStep(2);
        }
    }
    const Step = () => {
        if (carts && carts.length > 0) {
            setCurrentStep(0)
        }
        else {
            setCurrentStep(-1)
        }
    }

    useEffect(() => {
        Step();
    }, [carts])
    return (<>
        {carts.length === 0 &&
            <div style={{ justifyContent: 'center', textAlign: 'center' }}>
                <div>
                <Result
    status="404"
    title="oh no! không có sản phẩm nào"
  />
                </div>
                <div  style={{ paddingBottom:50}}>
                    <NavLink to='/' className='nav-Link'>
                        <Button className="btn btn-warning" style={{ height: 38 }}>
                            <span style={{ paddingLeft: 25, paddingRight: 25, paddingBottom: 5, fontSize: 14 }}>
                                Tiếp tục mua sắm </span>
                        </Button>
                    </NavLink>
                </div>

            </div>
        }
        {carts && carts.length > 0 &&
            <div>


                <Steps
                    size="small"
                    current={currentStep}
                    status="process"
                    type='navigation'
                    items={[
                        {
                            title: 'Đặt hàng',
                            icon: <GiftOutlined />,
                        },
                        {
                            title: 'Thanh toán',
                            icon: <CreditCardOutlined />,
                        },
                        {
                            title: 'Thành công',
                            status: 'wait',
                            icon: <SmileOutlined />,
                        },
                    ]}
                />
                <Row gutter={[20, 20]}>

                    <Col className="check-book" xl={18} lg={17} md={15} sm={16} xs={18}>
                        <Divider />
                        <Table style={{ paddingLeft: 25, border: '1px' }}
                            bordered={true}
                            onChange={onchange}
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={data}
                        />
                    </Col >
                    <Col xl={6} lg={6} md={7} sm={5} xs={11} >
                        <div style={{ paddingLeft: 50, paddingTop: 50 }}>
                            <div style={{ fontSize: 25 }}>Thông tin người mua</div>
                            <div>Tên: {user.fullName}</div>
                            <div>Số điện thoại: {user.phone}</div>
                            <div>Địa chỉ <TextArea placeholder="Vui lòng nhập địa chỉ giao hàng" onChange={(e) => {
                                setTitleBtn('')
                                setShowbtnBuy(false)
                                setAddress(e.target.value)
                            }}></TextArea></div>
                        </div>
                        <div style={{ paddingLeft: 50, paddingTop: 2 }}>
                            <div style={{ paddingBottom: 15, fontSize: 15 }}>
                                Tạm tính:{totalMonney.toLocaleString().replace(/,/g, " ",)}
                            </div>
                            <div style={{ paddingBottom: 15 }}><span style={{ paddingBottom: 15, fontSize: 25, color: 'red' }}>
                                Tổng tiền: {`${totalMonney.toLocaleString().replace(/,/g, " ",)}`} </span>
                            </div>
                            {<Button
                                title={titleBtn}
                                disabled={showbtnBuy}
                                onClick={() => { handleBuyCarts(itemWillBuy) }}
                                style={{ color: 'white', background: 'red', width: 200, height: 50 }}>
                                {currentStep === 2 && <LoadingOutlined />}  <span> Mua Hàng </span> ({totalWillBuy})
                            </Button>}

                        </div>
                    </Col>
                </Row>
            </div>
        }
    </>

    )
}
export default Order;