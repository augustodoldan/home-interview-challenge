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
import { validator } from "../utils/validator";

export default function Page() {
  const [pageConfig, setPageConfig] = useState(null);
  const [dataForm, setDataForm] = useState([])
  const [formIsValid, setFormIsValid] = useState(false);
  const router = useRouter();
  const { path } = router.query;



  const updateFormData = (data) => {

    setDataForm((prevDataForm) => {

      const result = prevDataForm.filter((element) => element.id !== data.id)
      result.push(data)
      return [...result]
    })
  }

  const processWidget = (input) => {
    const isInDataForm = dataForm.find((element) => element.id === input.id)

    if (input?.conditions?.render?.[0]?.[0].comparision === "includes") {

      let propertyToSearch = input?.conditions?.render?.[0]?.[0].input
      let valueToSearch = input?.conditions?.render?.[0]?.[0].values[0]

      const found_value = validator.includes(dataForm, propertyToSearch, valueToSearch)

      if (found_value) {
        setDataForm((prevState) => [...prevState, { [inp.name]: "", validated: false, type: inp.type, id, required: element.required }])

        return renderPageComponents(input);
      } else if (isInDataForm) {
        setDataForm((prevDataForm) => {

          const result = prevDataForm.filter((element) => element.id !== input.id)

          return [...result]
        })
      }
    } else {
      return renderPageComponents(input);
    }
  }


  const renderPageComponents = (widgetData) => {
    switch (widgetData.type) {
      case ComponentTypes.TEXT:
      case ComponentTypes.EMAIL:
        return <InputWidget config={widgetData} updateFormData={updateFormData} />;

      case ComponentTypes.PASSWORD:
      case ComponentTypes.CONFIRM_PASSWORD:
        return <PasswwordWidget config={widgetData} updateFormData={updateFormData} />;

      case ComponentTypes.CHECKBOX:
        return <CheckboxWidget config={widgetData} updateFormData={updateFormData} />;

      case ComponentTypes.BUTTON:
        return <ButtonWidget config={widgetData} disabled={!formIsValid} />;

      case ComponentTypes.SELECT:
        return <SelectWidget config={widgetData} updateFormData={updateFormData} />;

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
        if (element.name && !element?.conditions?.render) {
          setDataForm((prevState) => [...prevState, { [element.name]: "", validated: false, type: element.type, id, required: element.required }])
        }
        return { ...element, id }
      })
      setPageConfig({ ...data, inputs: processed_data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const isFormValid = dataForm.every((field, index) => {
      console.log(field)
      return field.validated === true

    });
    setFormIsValid(isFormValid);
  }, [dataForm]);


  useEffect(() => {
    getData();
  }, [path]);

  return (
    <>
      <div style={{ width: '50%', margin: '0 auto', padding: '20px' }}>

        <h1>{pageConfig ? pageConfig.title : ""}</h1>
        <Form >
          {pageConfig?.inputs.map((input) => {
            return processWidget(input)
          })}

        </Form>
        {JSON.stringify(dataForm)}
        <p>form is valids</p>
        {JSON.stringify(formIsValid)}

      </div>
    </>
  );
}