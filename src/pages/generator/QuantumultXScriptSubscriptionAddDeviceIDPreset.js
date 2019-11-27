
import React from 'react';
import { Breadcrumb, Form, Row, Col, Input, Button, message } from 'antd';
import styles from './QuantumultXScriptSubscriptionAddDeviceIDPreset.css';
import URLSafeBase64 from 'urlsafe-base64';
import copy from 'copy-to-clipboard';

class QuantumultXScriptSubscriptionAddDeviceIDPresetGenerateForm extends React.Component {
  state = {
    showResult: false,
    result: ''
  };

  getFields() {
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <Row>
          <Col span={24} key="id" style={{ display: "block" }}>
            <Form.Item label="设备 ID">
              {getFieldDecorator('id', {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入设备 ID',
                  },
                ],
              })(<Input placeholder="多个 ID 用空格分隔" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} key="url" style={{ display: "block" }}>
            <Form.Item label="脚本订阅链接">
              {getFieldDecorator('url', {
                rules: [
                  {
                    required: true,
                    message: '请输入订阅链接',
                  },
                  {
                    type: 'url',
                    message: '请输入有效的网址',
                  }
                ],
              })(<Input placeholder="" />)}
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  }

  handleConfirm = e => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        this.setState({showResult: false})
      } else {
        const id = values.id.trim();
        const url = values.url.trim();

        const params = `id=${encodeURIComponent(id)}&src=${encodeURIComponent(url)}`;
        
        this.setState({
          showResult: true,
          result: params
        });

        copy(params);
        message.info('预设参数结果已生成并复制到剪贴板');
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const grids = {xs: 24, sm: 18, md:12, lg:9, xl:9, xxl: 9}

    return (
      <>
        <Row>
          <Col {...grids} style={{ textAlign: 'left' }}>
            <Form className={styles.form} onSubmit={this.handleConfirm}>
                {this.getFields()}
        
                <Button type="primary" htmlType="submit">生成</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>   
            </Form>
          </Col>
        </Row>
        <div style={{height: '18px'}} />
        <Row style={{display: this.state.showResult ? 'block' : 'none'}}>
          <Col {...grids} style={{ textAlign: 'left' }}>

              <Input readOnly value={this.state.result}/>


          </Col>
        </Row>
      </>
      
    );
  }
}

const WrappedQuantumultXScriptSubscriptionAddDeviceIDPresetGenerateForm = Form.create({ name: 'generate' })(QuantumultXScriptSubscriptionAddDeviceIDPresetGenerateForm);

export default function() {
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Generator</Breadcrumb.Item>
        <Breadcrumb.Item>QuantumultXScriptSubscriptionAddDeviceID</Breadcrumb.Item>
        <Breadcrumb.Item>Preset</Breadcrumb.Item>
      </Breadcrumb>
      <h1>QuantumultX 脚本订阅批量生成设备 ID 预设</h1>
      <div className={styles.normal}>具体使用方式请参考 <a href="https://t.me/singee_daily">https://t.me/singee_daily</a></div>
      <WrappedQuantumultXScriptSubscriptionAddDeviceIDPresetGenerateForm />
    </div>
  );
}
