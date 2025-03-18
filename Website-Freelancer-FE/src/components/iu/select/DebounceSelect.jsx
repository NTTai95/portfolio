import { Select, Spin, Tag } from "antd";
import React, { useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";
import scss from "./DebounceSelect.module.scss";

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 800,
  color,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      if (!value) {
        setOptions([]);
        return;
      }
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId === fetchRef.current) {
          setOptions(newOptions);
          setFetching(false);
        }
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const tagRender = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag className={scss.tag}
        color={color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      value={value}
      onChange={setValue}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      tagRender={tagRender}
      {...props}
      options={options}
    />
  );
}

export default DebounceSelect;
