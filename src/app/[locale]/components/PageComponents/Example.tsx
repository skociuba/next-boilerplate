'use client';
import React from 'react';

export const Example = ({ data }: { data: { title: string; id: string }[] }) => {
  return (
    <>
      {data && (
        <div>
          {Array.isArray(data) &&
            data.map(({ title, id }: { title: string; id: string }) => (
              <div key={id} className="flex flex-row">
                <p className="w-2/3">{title}</p>
              </div>
            ))}
        </div>
      )}
    </>
  );
};
