import React, { useEffect, useState } from 'react';
import { Col, Form, Input, InputNumber, Modal, Select, Upload, message } from 'antd';
import { callUploadBookImg, createBook, getCategory } from '../../../../service/api';
import { PlusOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';


const ModalAddNewBook = (props) => {
    const { isShowMANB, onClose } = props;
    const [form] = Form.useForm();
    const [listcategory, setListcategory] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [thumbnail,setThumbnail]=useState('')
    const [slider,setSlider]=useState(
       []
        )
        const [slider1,setSlider1]=useState(
            []
             ) 
    const [fileList, setFileList] = useState([
    
    ]);
    const [fileList2, setFileList2] = useState([

    ]);
    const handleCancel = () => setPreviewOpen(false);
    const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = async({ fileList: newFileList }) =>{
        setFileList(newFileList);
  
    }
    const handleChange2 = ({ fileList: newFileList }) =>{
        setFileList2(newFileList);
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    const onFinish = async(values) => {
        const mainText = values.mainText;
        const author = values.author;
        const price = values.price;
        const sold = values.sold;
        const quantity = values.quantity;
        const category = values.category;
        const res = await createBook({slider,mainText,author,price,sold,quantity,category,thumbnail})
        if(res?.data){
            message.success('Thêm mới book thành công');
            form.resetFields();
            setSlider('');
            setThumbnail('')
            onClose()
        }    
    }

    useEffect(() => {
        const category = async () => {
            const res = await getCategory();
            let d = res.data.map(item => {
                return { label: item, value: item }
            }
            )
            setListcategory(d)
        }
        category()
    }, [])
   const handleUploadfile1 = async({file})=>{
    let res = await callUploadBookImg(file)
    setThumbnail(res.data.fileUploaded)
   }
   const handleUploadfile2 = async({file})=>{
    let res = await callUploadBookImg(file)
      setSlider1((sider1)=>[...slider1,{
        name:res.data.fileUploaded}])
        let x = slider1.map(item=>{return item.name})
        setSlider(x)
   }
    return (
        <>
            <Modal width='700px' title="Thông tin sách thêm mới" open={isShowMANB} onOk={() => form.submit()} onCancel={onClose}>
                <Form
                    //   {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 900 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Form.Item name="mainText" label="Tên sách" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item style={{ paddingLeft: 180 }} name="author" label="Tác giả" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                    </div>
                   


                    <Form.Item name="price" label="Giá tiền" rules={[{ required: true }]}>
                        <InputNumber addonAfter="VNĐ" defaultValue={100} />
                    </Form.Item>

                    <Form.Item name="category" label="Thể loại" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={listcategory
                            }
                        />
          
                    </Form.Item>
                    <Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]}>
                        <InputNumber defaultValue={100} />
                    </Form.Item>
                    <Form.Item name="sold" label="Đã bán" rules={[{ required: true }]}>
                        <InputNumber defaultValue={100} />
                    </Form.Item>

                  
                    <div style={{display:'flex',justifyItems:'center'}}>

                 <Form.Item  name="thumbnail" label="Ảnh Thumbnail">
                 <div style={{display:'flex',justifyItems:'center'}}>
                        <Upload
                            maxCount={1}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-circle"
                            fileList={fileList}
                            customRequest={handleUploadfile1}
                            onPreview={handlePreview}
                            onChange={handleChange}
                          
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        </div>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Form.Item>


                    <Form.Item name="slider" label="Ảnh slider" >
                        <Upload
                            
                            multiple
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-circle"
                            fileList={fileList2}
                            customRequest={handleUploadfile2}
                            onPreview={handlePreview}
                            onChange={handleChange2}
                         
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Form.Item>
               </div>
                </Form>
            </Modal>


        </>
    )
}
export default ModalAddNewBook;