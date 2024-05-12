import { useEffect, useState } from 'react';
import { httpRequest } from '@utils/index';

function useOptionPost(requestUrl, params?:any) {
  const [loading, setLoading] = useState( false );
  const [options, setOptions] = useState([]);
  const [originData, setOriginData] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptions = async () => {
    if (requestUrl) {
      try {
        setLoading(true);
        const res:any = await httpRequest.post(requestUrl, params);
        if (res.code === 0) {
          const mappedOptions = res.data.map((c) => ({
            label: c.value,
            value: c.key,
          }));
          setOptions(mappedOptions);
          setOriginData(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (requestUrl) {
      getOptions();
    } else {
      setOptions([]);
      setOriginData([]);
    }
  }, [requestUrl, getOptions]);

  return { loading, options, originData };
}

export default useOptionPost;
