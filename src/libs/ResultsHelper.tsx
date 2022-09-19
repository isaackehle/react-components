import MinHelper from "./MinHelper";

interface ResultsHelperProps {
  value: string;
  min_len: number;
  list_len: number;
}

export default function ResultsHelper({ value = "", min_len = 0, list_len = 0 }: ResultsHelperProps) {
  const isEnough = () => MinHelper(value, min_len);

  return (
    <div>
      {isEnough() ? (
        <p>
          <strong>Result(s): {list_len} </strong>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
