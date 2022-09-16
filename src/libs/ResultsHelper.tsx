import MinHelper from "./MinHelper";

interface ResultsHelperProps {
  value: string;
  min_len: number;
  list: string[];
}

export default function ResultsHelper({ value = "", min_len = 0, list = [] }: ResultsHelperProps) {
  const isEnough = () => MinHelper(value, min_len);

  return (
    <div>
      {isEnough() ? (
        <p>
          <strong>Result(s): {list.length} </strong>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
