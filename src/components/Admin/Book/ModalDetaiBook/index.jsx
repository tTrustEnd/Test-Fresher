import React, { useEffect, useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import { Badge, Descriptions, Image, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
// import { v1 as uuidv1 } from 'uuid';
// import { v2 as uuidv2 } from 'uuid';


const ModalDetaBook = (props) => {
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const { dataBookView, isShowModalDetaiBook, onClose } = props;
    const [placement, setPlacement] = useState("right");
    const handleCancel = () => setPreviewOpen(false);
    let urlAvt = `${import.meta.env.VITE_BASE_URL}/images/book/${dataBookView.thumbnail}`

    const [fileList, setFileList] = useState([
    ]);

    let x = dataBookView.slider;
    let y = dataBookView.thumbnail;
    const handlePreview = async (file) => {
        if (file.url && file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = () =>
        setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
     let url3 = `${import.meta.env.VITE_BASE_URL}/images/book/${y}` 
    return (
        <>
            <Space>
            </Space>
            <Drawer
                title="Thông tin sách "
                placement={placement}
                width={850}
                onClose={onClose}
                open={isShowModalDetaiBook}
                size='default'
                extra={
                    <Space>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <Descriptions
                    column={2} bordered>
                    <Descriptions.Item label="_id:">{dataBookView._id}</Descriptions.Item>
                    <Descriptions.Item label=" thumbnail:"   >{dataBookView.thumbnail}</Descriptions.Item>
                    <Descriptions.Item style={{ paddingTop: 0, paddingBottom: 0 }} label="Tên sách:" >{dataBookView.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả:">{dataBookView.author}</Descriptions.Item>
                    <Descriptions.Item label="Đã bán:" span={15}   >
                        <Badge status="processing" />  {dataBookView.sold}
                    </Descriptions.Item>
                    <Descriptions.Item label=" Giá tiền:">{dataBookView.price}</Descriptions.Item>
                    <Descriptions.Item label=" updatedAt:">{dataBookView.updatedAt}</Descriptions.Item>
                    <Descriptions.Item label="Số lượng:">{dataBookView.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Thể loại:">{dataBookView.category}</Descriptions.Item>
                    <Descriptions.Item label="Hình ảnh">
                        <Image
                            width={100}
                            src={url3}
                        />
                        <Image
                            width={100}
                            src={urlAvt}
                        />
                        {x && x.map((item, index) => {

                            let url2 = `${import.meta.env.VITE_BASE_URL}/images/book/${item}`
                            return (
                                <Image
                                    width={100}
                                    src={url2}
                                />
                            )
                        })

                        }

                        <div>
                            <Upload
                                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                showUploadList={
                                    {
                                        showRemoveIcon: false
                                    }
                                }
                            >

                            </Upload>
                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>

                    </Descriptions.Item>

                </Descriptions>


            </Drawer>



        </>
    )
}
export default ModalDetaBook;