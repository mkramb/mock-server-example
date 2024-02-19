import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const API_URL = process.env.API_URL ?? 'http://localhost:3001';

export const getFacts = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/facts`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return (await response.json()).data ?? [];
};

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const facts = await getFacts();

  return (
    <Table>
      <TableCaption>A list of cat facts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Number</TableHead>
          <TableHead>Message</TableHead>
        </TableRow>
      </TableHeader>
      {facts.map((fact, index) => {
        return (
          <TableBody key={index}>
            <TableRow>
              <TableCell className="font-medium text-center">{index + 1}</TableCell>
              <TableCell>{fact}</TableCell>
            </TableRow>
          </TableBody>
        );
      })}
    </Table>
  );
}
