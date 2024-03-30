import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form } from "reactstrap";
import InputWidget from "../components/InputWidget";
import { ComponentTypes } from "../utils/componentsTypes";
import PasswwordWidget from "../components/PasswwordWidget";
import CheckboxWidget from "../components/CheckboxWidget";
import ButtonWidget from "../components/ButtonWidget";
import SelectWidget from "../components/SelectWidget";

export default function Page() {
  const [pageConfig, setPageConfig] = useState(null);

  const router = useRouter();
  const { path } = router.query;

  const getData = async () => {

    try {
      const response = await fetch(`/configuration/${path}`);
      if (response.status != 200) {
        throw new Error("response.message")
      }
      const data = await response.json();
      setPageConfig(data.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderPageComponents = (widgetData) => {

    switch (widgetData.type) {
      case ComponentTypes.TEXT:
        return <InputWidget config={widgetData} />;
      case ComponentTypes.PASSWORD:
        return <PasswwordWidget config={widgetData} />;
      case ComponentTypes.CONFIRM_PASSWORD:
        return <PasswwordWidget config={widgetData} />;
      case ComponentTypes.CHECKBOX:
        return <CheckboxWidget config={widgetData} />;
      case ComponentTypes.BUTTON:
        return <ButtonWidget config={widgetData} />;
      case ComponentTypes.SELECT:
        return <SelectWidget config={widgetData} />;
      default:
        return <div>Error 404: Page not found</div>;
    }
  };

  useEffect(() => {
    getData();
  }, [path]);

  return (
    <>
      <div style={{ width: '50%', margin: '0 auto', padding: '20px' }}>

        <h1>{pageConfig ? pageConfig.title : ""}</h1>
        <Form>

          {pageConfig?.inputs.map((input) => {
            return renderPageComponents(input)
          })}

        </Form>
      </div>
    </>
  );
}
