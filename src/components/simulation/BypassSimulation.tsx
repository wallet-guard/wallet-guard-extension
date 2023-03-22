// export function BypassSimulationComponent(props) {
//   return (
//     <>
//       <div style={{ backgroundColor: 'black' }}>
//         <SimulationHeader />
//       </div>

//       <div>
//         {((currentSimulation.state === StoredSimulationState.Success &&
//           currentSimulation.simulation?.warningType === SimulationWarningType.Warn) ||
//           currentSimulation.simulation?.warningType === SimulationWarningType.Info ||
//           currentSimulation.simulation?.error) && (
//           <div>
//             <SimulationOverview
//               warningType={currentSimulation.simulation?.warningType}
//               message={currentSimulation.simulation?.message}
//               method={currentSimulation.simulation.method}
//             />
//           </div>
//         )}
//       </div>

//       {currentSimulation.state === StoredSimulationState.Success && (
//         <div className="pt-4">
//           <ContractDetails storedSimulation={filteredSimulations && currentSimulation} />
//         </div>
//       )}

//       <div className="pb-4">
//         <TransactionContent storedSimulation={filteredSimulations && currentSimulation} />
//       </div>
//       <div style={{ height: '120px' }} />
//       <ConfirmSimulationButton storedSimulation={filteredSimulations && currentSimulation} />
//     </>
//   );
// }
