import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form } from "reactstrap";
import InputWidget from "../components/InputWidget";
import { ComponentTypes } from "../utils/componentsTypes";
import PasswwordWidget from "../components/PasswwordWidget";
import CheckboxWidget from "../components/CheckboxWidget";
import ButtonWidget from "../components/ButtonWidget";
import SelectWidget from "../components/SelectWidget";
import LinkWidget from "../components/LinkWidget";
import { v4 as uuidv4 } from 'uuid';

export default function Page() {
  const [pageConfig, setPageConfig] = useState(null);
  const [dataForm, setDataForm] = useState([])
  const router = useRouter();
  const { path } = router.query;



  const addData = (data) => {

    setDataForm((prevDataForm) => {

      const result = prevDataForm.filter((element) => element.id !== data.id)
      result.push(data)
      return [...result]
    })


  }

  const renderPageComponents = (widgetData) => {
    switch (widgetData.type) {
      case ComponentTypes.TEXT:
      case ComponentTypes.PASSWORD:
      case ComponentTypes.CONFIRM_PASSWORD:
      case ComponentTypes.EMAIL:
        return <InputWidget config={widgetData} addData={addData} />;
      case ComponentTypes.CHECKBOX:
        return <CheckboxWidget config={widgetData} />;
      case ComponentTypes.BUTTON:
        return <ButtonWidget config={widgetData} />;
      case ComponentTypes.SELECT:
        return <SelectWidget config={widgetData} addData={addData} />;
      case ComponentTypes.LINK:
        return <LinkWidget config={widgetData} />;
      default:
        return <div>Error 404: Page not found</div>;
    }
  };


  const getData = async () => {

    try {
      const response = await fetch(`/configuration/${path}`);
      if (response.status != 200) {
        throw new Error("response.message")
      }
      const { data } = await response.json();
      const processed_data = data.inputs.map((element) => {
        const id = uuidv4().substring(0, 7);
        return { ...element, id }
      })
      setPageConfig({ ...data, inputs: processed_data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, [path]);

  return (
    <>
      <div style={{ width: '50%', margin: '0 auto', padding: '20px' }}>

        <h1>{pageConfig ? pageConfig.title : ""}</h1>
        <Form >
          {pageConfig?.inputs.map((input) => {
            return renderPageComponents(input)
          })}

        </Form>
      </div>
    </>
  );
}