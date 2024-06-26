import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, Spinner } from "reactstrap";
import InputWidget from "../components/InputWidget";
import { ComponentTypes } from "../utils/componentsTypes";
import PasswwordWidget from "../components/PasswwordWidget";
import CheckboxWidget from "../components/CheckboxWidget";
import ButtonWidget from "../components/ButtonWidget";
import SelectWidget from "../components/SelectWidget";
import LinkWidget from "../components/LinkWidget";
import { v4 as uuidv4 } from 'uuid';
import { validator } from "../utils/validator";
import axios from "axios";

export default function Page() {
  const [pageConfig, setPageConfig] = useState(null);
  const [dataForm, setDataForm] = useState([])
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
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
        return <InputWidget config={widgetData} updateFormData={updateFormData} dataForm={dataForm} />;

      case ComponentTypes.PASSWORD:
      case ComponentTypes.CONFIRM_PASSWORD:
        return <PasswwordWidget config={widgetData} updateFormData={updateFormData} dataForm={dataForm} />;

      case ComponentTypes.CHECKBOX:
        return <CheckboxWidget config={widgetData} updateFormData={updateFormData} />;

      case ComponentTypes.BUTTON:
        return <ButtonWidget config={widgetData} disabled={!formIsValid} path={path} dataForm={dataForm} />;

      case ComponentTypes.SELECT:
        return <SelectWidget config={widgetData} updateFormData={updateFormData} />;

      case ComponentTypes.LINK:
        return <LinkWidget config={widgetData} />;

      default:
        return <div>Este componente no se puede mostrar.</div>;
    }
  };





  const getData = async () => {

    try {
      setLoading(true)
      const response = await axios.get(`/configuration/${path}`);
      if (response.status != 200) {
        throw new Error("response.message")
      }
      setError(false)
      setLoading(false)

      const data = response.data.data[0];
      const processed_data = data.inputs.map((element) => {
        const id = uuidv4().substring(0, 7);
        if (element.name && !element?.conditions?.render) {
          setDataForm((prevState) => [...prevState, { [element.name]: "", validated: false, type: element.type, id, required: element.required }])
        }
        return { ...element, id }
      })
      setPageConfig({ ...data, inputs: processed_data });
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  };

  useEffect(() => {
    const isFormValid = dataForm.every((field, index) => {
      return field.validated === true

    });
    setFormIsValid(isFormValid);
  }, [dataForm]);

  useEffect(() => {
    getData();
  }, [path]);

  return (
    <>
      {error ? <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', padding: 50 }}>
        <h1>404</h1>
        <h4>Ha ocurrido un error</h4>

      </div> :
        <div style={{ width: '60%', margin: '0 auto', marginTop: '40px', padding: '20px', border: '1px solid black' }}>

          <h1>{pageConfig ? pageConfig.title : ""}</h1>
          <Form>
            {pageConfig?.inputs.map((input) => {
              return processWidget(input)
            })}
          </Form>

        </div >}
      {
        loading &&
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner
            className="m-9"
            color="dark"
            type="grow"
          >
            Loading...
          </Spinner>
        </div>
      }

    </>
  );
}