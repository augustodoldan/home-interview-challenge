import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import InputWidget from "../components/InputWidget";

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
      console.log(pageConfig)
      console.log(path)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderPageComponents = (widgetData) => {
    switch (widgetData.type) {
      case 'text':
        return <InputWidget config={widgetData} />;
      default:
        return <div>Error 404: Page not found</div>;
    }
  };

  useEffect(() => {
    getData();
  }, [path]);

  return (
    <>
      <Form>
        <FormGroup>

          {pageConfig?.inputs.map((input) => {
            console.log(input)
            return renderPageComponents(input)
          })}

        </FormGroup>
      </Form>
    </>
  );
}
