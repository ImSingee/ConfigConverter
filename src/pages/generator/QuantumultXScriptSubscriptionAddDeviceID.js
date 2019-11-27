
import React from 'react';
import { Breadcrumb, Form, Row, Col, Input, Button, message } from 'antd';
import styles from './QuantumultXScriptSubscriptionAddDeviceID.css';
import URLSafeBase64 from 'urlsafe-base64';
import copy from 'copy-to-clipboard';

class QuantumultXScriptSubscriptionAddDeviceIDGenerateForm extends React.Component {
  state = {
    showResult: false,
    result: ''
  };

  getFields() {
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <Row>
          <Col span={24} key="password" style={{ display: "block" }}>
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                required: false,
                rules: [
                  {
                    whitespace: true,
                    message: '密码不能为纯空格',
                  },
                ]
              })(<Input placeholder="未设定密码请留空" />)}
            </Form.Item>
          </Col>
        </Row>
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
        console.log(errors);
        this.setState({showResult: false})
      } else {
        const id = values.id.trim();
        const url = values.url;
        const password = values.password;

        const paramsB64 = URLSafeBase64.encode(Buffer.from(`id=${encodeURIComponent(id)}&src=${encodeURIComponent(url)}`));
        let result = `${document.location.origin}/api/QuantumultXScriptSubscriptionAddDeviceID?b64=${paramsB64}`;

        if (password) {
          result += `&pwd=${password.trim()}`;
        }

        this.setState({
          showResult: true,
          result
        });

        copy(result);
        message.info('订阅网址已生成并复制到剪贴板');
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

const WrappedQuantumultXScriptSubscriptionAddDeviceIDGenerateForm = Form.create({ name: 'generate' })(QuantumultXScriptSubscriptionAddDeviceIDGenerateForm);

export default function() {
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Generator</Breadcrumb.Item>
        <Breadcrumb.Item>QuantumultXScriptSubscriptionAddDeviceID</Breadcrumb.Item>
      </Breadcrumb>
      <h1>QuantumultX 脚本订阅批量生成设备 ID</h1>
      <div className={styles.normal}>具体使用方式请参考 <a href="https://t.me/singee_daily">https://t.me/singee_daily</a></div>
      <WrappedQuantumultXScriptSubscriptionAddDeviceIDGenerateForm />
    </div>
  );
}
