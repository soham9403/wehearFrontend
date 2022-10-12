import { memo, useState } from "react";


import Creatable from "react-select/creatable";
import { withAsyncPaginate } from "react-select-async-paginate";



const CreatableAsyncPaginate = withAsyncPaginate(Creatable);

const DynamicDropDown = function ({ lazyFun, onSelect, defaultOption = [], placeholder = 'select..', defaultVal = null,...rest }) {
  const [value, onChange] = useState(defaultVal);  
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    pageSize: 10,
    pageNo: 1,
    hasMore: true,
    dropdown: true,
  });
  // const apicallFun = useApiCall();
  const loadOptions = async (search, prevOptions) => {
    if (!loading) {
      const currentPraams = { ...params };
      let hasMore = false;
      setLoading(true);
      try {
        const callResponse = await lazyFun({
          ...currentPraams,
          search,
          pageNo: Math.ceil(prevOptions.length / params.pageSize) + 1,
        });
        const data = callResponse.data
        if (data.pageNo * data.pageSize <= data.total) hasMore = true;

        const response = data.result

        const finalArray = [];
        response.forEach(row => {

          finalArray.push({
            label: row.name,
            value: row._id,
          });
        });
        setLoading(false);
        return {
          options: finalArray,
          hasMore,
        };

      } catch (e) {
        setLoading(false);
        alert(e.message)
      }



    }

    return {
      options: prevOptions,
      hasMore: true,
    };
  };
  return (
    <CreatableAsyncPaginate
      value={value}
      {...rest}
      placeholder={placeholder}
      defaultOptions={defaultOption}
      loadOptions={loadOptions}
      defaultAdditional
      onChange={val => {
        onChange(val);
        onSelect(val);
      }}
    />
  );
};

export default memo(DynamicDropDown);
