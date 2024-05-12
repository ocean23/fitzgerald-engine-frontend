import { Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { globalStyles } from '@/styles/index';
import { inputType, Search } from '@/components/index';

const { Content } = globalStyles;

const generateFields = () => [
  {
    name: 'name',
    label: '流程名称',
    type: inputType.input,
    inputProps: {
      placeholder: '请输入流程名称',
      allowClear: true,
    },
  },
  {
    name: 'scene',
    label: '应用场景',
    type: inputType.select,
    // 应用场景 LOAN_PRE("贷前"), LOAN_DURING("贷中"), LOAN_POST("贷后");
    inputProps: {
      options: [
        {
          value: 'LOAN_PRE',
          label: '贷前',
        },
        {
          value: 'LOAN_DURING',
          label: '贷中',
        },
        {
          value: 'LOAN_POST',
          label: '贷后',
        },
      ],
      showAllOption: false,
    },
  },
  {
    name: 'status',
    label: '状态',
    type: inputType.select,
    // 流程状态 RUNNING("进行中") SUCCESS("成功") FAILURE("失败")
    inputProps: {
      options: [
        {
          value: 'RUNNING',
          label: '进行中',
        },
        {
          value: 'SUCCESS',
          label: '成功',
        },
        {
          value: 'FAILURE',
          label: '失败',
        },
      ],
      showAllOption: false,
    },
  },
];
function SearchForm({
  onSubmit = () => {},
  //   importHanle,
  handleAddClick = () => {},
  //   onChange,
  //   switchValue,
  //   exportHandle,
}) {
  //   const formRef = useRef(null);

  const fields = generateFields();
  //   const uploadInterviewFile = async (event) => {
  //     await importHanle(event);
  //     setImportRecordDrawerVisible(true);
  //   };
  //   const handleExport = async () => {
  //     await exportHandle();
  //     setExportRecordDrawerVisible(true);
  //   };

  //   const exportRecordSearchCriteria = fields.map((f) => ({
  //     key: f.name,
  //     label: f.label,
  //   }));
  //   useEffect(() => {
  //     if (formRef.current && Object.keys(SearchValueStore.searchValue).length) {
  //       formRef.current.setFieldsValue({ ...SearchValueStore.searchValue });
  //     }
  //   }, [formRef]);
  return (
    <Content>
      <Search
        onSubmit={onSubmit}
        fields={fields}
        // initialValues={{ enablePlatformBlack: false }}
        // getForm={(form) => {
        //   form.setFieldValue('enablePlatformBlack', switchValue);
        //   formRef.current = form;
        // }}
        extra={
          <Form.Item style={{ marginLeft: 10 }}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              ghost
              onClick={handleAddClick}
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              新增
            </Button>
          </Form.Item>
        }
      />
    </Content>
  );
}



export default observer(SearchForm);
