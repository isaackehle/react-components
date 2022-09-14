import MinHelper from "./MinHelper";

interface ResultsHelperProps {
  value: string;
  min: number;
  list: string[];
}

export default function ResultsHelper({ value = "", min = 0, list = [] }: ResultsHelperProps) {
  const isEnough = () => MinHelper(value, min);

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
