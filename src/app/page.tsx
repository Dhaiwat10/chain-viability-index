/* eslint-disable @next/next/no-img-element */
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getChainDataWithHVS,
  renderCPUCores,
  renderRAM,
  renderStorage,
} from "@/lib/chain-data";
import { calculateTPSScore } from "@/lib/chains";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col row-start-2 items-center sm:items-start px-24 py-4">
      <h1 className="text-4xl font-bold mt-8">🏡 Home Verifiability Score</h1>
      <p className="text-lg text-gray-500">
        The Home Verifiability Score (HVS) is a metric that measures how easily
        and efficiently a blockchain network can be verified by consumer
        hardware at home. A higher score indicates better accessibility and
        lower hardware requirements for running a full node.
      </p>

      <Table className="w-full mt-8">
        <TableHeader>
          <TableRow>
            <TableHead>Chain</TableHead>
            <TableHead>HVS</TableHead>
            <TableHead>CPU</TableHead>
            <TableHead>RAM</TableHead>
            <TableHead>Storage</TableHead>
            <TableHead>TPS</TableHead>
            <TableHead>TPS Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getChainDataWithHVS().map((chain) => (
            <TableRow key={chain.name}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={chain.iconURL}
                    alt={chain.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{chain.name}</span>
                </div>
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <span className="w-12">{chain.hvs}</span>
                <Progress value={chain.hvs} max={100} />
              </TableCell>
              <TableCell>
                {renderCPUCores(chain.hardwareRequirements.cpuCores)}
              </TableCell>
              <TableCell>{renderRAM(chain.hardwareRequirements.RAM)}</TableCell>
              <TableCell>
                {renderStorage(chain.hardwareRequirements.storage)}
              </TableCell>

              <TableCell>{chain.maxTheoreticalTPS}</TableCell>

              <TableCell>
                <Progress
                  value={calculateTPSScore(chain)}
                  max={100}
                  className="w-24"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h4 className="text-xl mt-8 font-bold">
        How is the Home Verifiability Score calculated?
      </h4>
      <p className="text-gray-500">
        The Home Verifiability Score (HVS) is calculated as a weighted average
        of hardware requirements: RAM (40%), CPU (45%), and Storage (15%). Each
        component is scored based on accessibility for typical home setups based
        on hardware purchase cost and maintenance costs.
      </p>

      <Link
        href="https://twitter.com/dhaiwat10"
        target="_blank"
        className="mt-8 text-blue-500"
      >
        Made by Dhai
      </Link>
    </main>
  );
}
